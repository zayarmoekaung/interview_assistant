interface ChangeInfo {
  object: any;
  property: string | symbol;
  oldValue: any;
  newValue: any;
}

function createMonitoringProxy<T extends object>(
  target: T,
  onChange: (changeInfo: ChangeInfo) => void,
  watchedProperties?: (keyof T)[] 
): T {
  return new Proxy(target, {
    set: function (obj: T, prop: string | symbol, value: any) {
      if (watchedProperties && !watchedProperties.includes(prop as keyof T)) {
        obj[prop as keyof T] = value; 
        return true;
      }
      
      const oldValue = obj[prop as keyof T];
      obj[prop as keyof T] = value;
      
      if (oldValue !== value) {
        onChange({
          object: obj,
          property: prop,
          oldValue,
          newValue: value,
        });
      }
      
      return true;
    },
  });
}

export { createMonitoringProxy };