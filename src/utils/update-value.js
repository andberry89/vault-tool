/* Method used throughout the app to updated a property via a component.
 ** Use case example: @output="updateValue(vmax, 'limiting_factor', $event)" */
const updateValue = (reference, key, value) => {
  reference[key] = value;
};

export default updateValue;
