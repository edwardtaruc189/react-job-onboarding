const normallizeTime = time => {
  const timeSplit = time.split(':');
  const hours = timeSplit[0];
  const minutes = timeSplit[1];
  const amPm = hours >= 12 ? 'PM' : 'AM';

  return (hours % 12 === 0 ? 1 : hours % 12) + ':' + Number(minutes).pad(2) + amPm;
};

export default normallizeTime;
