/* global google */
import { jsx, jsxs } from 'react/jsx-runtime';
import NavHeader from '../public/Navigation/NavHeader'
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  Select,
  List,
  ListItem,
  SkeletonText,
  Text,
  styled,
} from "@chakra-ui/react";
import { FaLocationArrow, FaTimes, FaParking } from "react-icons/fa";
import React, { useEffect, useState, useRef } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import {
  Autocomplete,
  DirectionsRenderer,
  DirectionsService
} from "@react-google-maps/api";
import "./Map.css";
import BookingModal from '../Modal/BookingModal';

const mapStyles = {
  width: "65%",
  height: "95vh",
};
const boxStyle = {
  width: "35%" ,
  height: "95vh",
};

const MapContainer = (props) => {
  
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [center, setCenter] = useState({ lat: latitude, lng: longitude });

  // const [markers, setMarkers] = useState([]);

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const originRef = useRef();
  const destinationRef = useRef();

  const [markers, setMarkers] = useState([]);

  const [nearestMarkers, setNearestMarkers] = useState([]);

  const handleMapClick = (mapProps, map, clickEvent) => {
    const newMarker = {
      lat: clickEvent.latLng.lat(),
      lng: clickEvent.latLng.lng(),
    };

    const newMarkers = [...markers, newMarker];
    setMarkers(newMarkers);
    saveMarkersToLocalStorage(newMarkers);
  };

  const saveMarkersToLocalStorage = (markers) => {
    localStorage.setItem("markers", JSON.stringify(markers));
  };

  const getMarkersFromLocalStorage = () => {
    const storedMarkers = localStorage.getItem("markers");
    return storedMarkers ? JSON.parse(storedMarkers) : [];
  };

  useEffect(() => {
    const storedMarkers = getMarkersFromLocalStorage();
    console.log(storedMarkers);
    setMarkers(storedMarkers);
  }, []);


  async function calculateRoute() {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }else{
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
      
    });
    
    // console.log("check" ,results)

    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }
}

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destinationRef.current.value = "";
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    }
  }, []);



  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        const map = props.google.maps;
        const newCenter = new map.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  };

  const handleDeleteMarker = (index) => {
    const updatedMarkers = [...markers];
    updatedMarkers.splice(index, 1);
    setMarkers(updatedMarkers);
    saveMarkersToLocalStorage(updatedMarkers);
  };

  function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Bán kính trái đất (đơn vị: km)
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  }

  useEffect(() => {
    if (latitude && longitude && markers.length > 0) {
      const nearest = markers
        .map((marker) => ({
          ...marker,
          distance: calculateDistance(
            latitude,
            longitude,
            marker.lat,
            marker.lng
          ),
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 5);
      setNearestMarkers(nearest);
    } else {
      setNearestMarkers([]);
    }
  }, [latitude, longitude, markers]);

  const [activeMarker, setActiveMarker] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  // const infowindow = new google.maps.InfoWindow();

  const handleMarkerClick = (props, marker) => {
    setSelectedPlace(props);
    setActiveMarker(marker);
  };

  const handleInfoWindowClose = () => {
    setSelectedPlace(null);
    setActiveMarker(null);
  };

  async function reverseGeocode(lat, lng) {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyArVizBbMBDY027MKq7kGrwuAPZB-am0oE`
      );
      const data = await response.json();

      if (data.results.length > 0) {
        const address = data.results[0].formatted_address;
        console.log(address); // In địa chỉ tại đây hoặc xử lý theo yêu cầu của bạn
        return address;
      } else {
        console.log("Không tìm thấy địa chỉ.");
      }
    } catch {
      console.error();
    }
  }

  async function getAddress(lat, lng) {
    try {
      const address = await reverseGeocode(lat, lng);
      return address;
    } catch (error) {
      console.error(error);
      return "";
    }
  }

  const [nearestAddresses, setNearestAddresses] = useState([]);

  useEffect(() => {
    const fetchNearestAddresses = async () => {
      const addresses = await Promise.all(
        nearestMarkers.map((marker) => getAddress(marker.lat, marker.lng))
      );
      setNearestAddresses(addresses);
    };

    fetchNearestAddresses();
  }, [nearestMarkers]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBooking = (index) => {
    setIsModalOpen(true);
  };

  return (
    <>
    {/* <NavHeader/> */}
    <Flex className="flexbox" display="flex">
      <Map
        // flexGrow={1}
        google={props.google}
        zoom={11}
        style={mapStyles}
        onClick={handleMapClick}
        center={{ lat: latitude, lng: longitude }}
      >
        {latitude && longitude && (
          <Marker position={{ lat: latitude, lng: longitude }} />
        )}
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker}
            onClick={handleMarkerClick}
            // icon={<FaParking/>
          />
        ))}
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
        <InfoWindow
          marker={activeMarker}
          visible={!!selectedPlace}
          // onClose={handleMarkerMouseout}
          onClose={handleInfoWindowClose}
        >
          <div className="popup">
            <h3 className="tieudepopup">ĐÂY LÀ BÃI XE</h3>
            <img src={selectedPlace?.image} alt={selectedPlace?.name} />
            <p>{selectedPlace?.description}</p>
          </div>
        </InfoWindow>
      </Map>
      <Box
        
        className="box1"
        style={boxStyle}
        p={4}
        borderRadius="lg"
        bgColor="white"
        shadow="base"
        // minW="container.md"
        zIndex="1"
      >
        <HStack spacing={2} justifyContent="space-between">
          <Box flexGrow={1}>
            <Autocomplete>
              <Input type="text" placeholder="Điểm xuất phát"   ref={originRef} />
            </Autocomplete>
          </Box>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input type="text" placeholder="Điểm đến" ref={destinationRef} />
            </Autocomplete>
          </Box>

          <ButtonGroup>
            <Button colorScheme="pink" type="submit"
             onClick={calculateRoute}>
              Chỉ Đường
            </Button>
            <IconButton
              aria-label="center back"
              style={{background:"yellow"}}
              icon={<FaTimes />}
              onClick={clearRoute}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent="space-between">
          <Text>Khoảng cách:{distance} </Text>
          <Text>Thời gian dự tính:{duration} </Text>
          <IconButton
            aria-label="center back"
            icon={<FaLocationArrow />}
            onClick={handleGetCurrentLocation}
          />
        </HStack>
        <Box mt={4}>
          <h1 className="tieude">GỢI Ý : NHỮNG BÃI ĐỖ GẦN BẠN </h1>
          <List spacing={6}>
            {nearestMarkers.map((marker, index) => (
              <ListItem key={index}>
                <Text>{`Địa điểm ${index + 1}:${nearestAddresses[index]} ,${
                  marker.lat
                } , ${marker.lng} `}</Text>
                <Button onClick={() => handleDeleteMarker(index)}>
                  Delete
                </Button>
                <Button onClick={() => handleBooking(index)}>Đặt chỗ</Button>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </Flex>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyArVizBbMBDY027MKq7kGrwuAPZB-am0oE",
})(MapContainer);
