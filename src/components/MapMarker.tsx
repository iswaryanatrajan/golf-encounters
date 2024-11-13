import React from 'react';
import PropTypes from 'prop-types';

interface MarkerProps {
  text: string;
  onClick?: () => void;
  lat: number;
  lng: number;
}

const Marker: React.FC<MarkerProps> = ({ text, onClick }) => (
  <div
    className="absolute top-1/2 left-1/2 w-4 h-4 bg-black border-2 border-white rounded-full select-none transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:z-1"
    onClick={onClick}
    aria-label={text}
  />
);

Marker.defaultProps = {
  onClick: undefined,
};

Marker.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};

export default Marker;
