function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  function stringAvatar(name) {
    const newName = name?.trimRight();
    const nameSplit = newName ? newName?.split(' ')?.length : 0;
    return {
      sx: {
        bgcolor: stringToColor(newName || ''),
      },
      style: {
        backgroundColor: stringToColor(newName || ''),
      },
      children: nameSplit > 1 ? `${newName?.split(' ')?.[0]?.[0]}${newName?.split(' ')?.[nameSplit - 1]?.[0]}`.toUpperCase() : `${newName?.split(' ')?.[0]?.[0]}`.toUpperCase(),
    };
  }
  
  export default stringAvatar;
  