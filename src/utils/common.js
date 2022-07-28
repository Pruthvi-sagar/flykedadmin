export const getPostTypeText = (type) => {
  if (type === 'fact') {
    return 'Fact';
  }
  if (type === 'inNews') {
    return 'In The News';
  }
  if (type === 'onThisDay') {
    return 'On This Day';
  }
  if (type === 'onBirthday') {
    return 'Birthday';
  }
  return '';
};
