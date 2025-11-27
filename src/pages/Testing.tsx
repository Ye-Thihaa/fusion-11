    import React from 'react';
    import Myanmar from '@react-map/myanmar';

    const MyMapComponent = () => {
      const handleSelect = (state, selectedStates) => {
        console.log(`Selected state: ${state}`);
        console.log(`Currently selected states: ${selectedStates}`);
      };

      return (
        <div style={{ width: '100%', height: '500px' }}>
          <Myanmar
            type="select-multiple" // or "select-single"
            size={350}
            mapColor="#ADD8E6" // Light blue
            strokeColor="#000000"
            hoverColor="#87CEEB" // Sky blue
            selectColor="#4682B4" // Steel blue
            hints={true}
            onSelect={handleSelect}
          />
        </div>
      );
    };

    export default MyMapComponent;