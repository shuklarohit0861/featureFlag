const SAMPLE_FEATURES = {
  show_dialog_box: true,
  enable_new_pricing: true,
};

const Cache = {
  featureFlags: {},
  timeStamp: null,
};

const MAX_TTL = 100000;

let featureFlagsPromise;

//backend call
function fetchAllFeature() {
  const isCache = Object.keys(Cache.featureFlags).length > 0;
  const timeStamp = Date.now() - Cache.timeStamp < MAX_TTL;

  if (isCache && timeStamp) {
    return new Promise((resolve) => {
      console.log("=== cache +++");
      resolve(Cache.featureFlags);
    });
  }

  //if the feature is pending
  if (featureFlagsPromise) {
    console.log("=== promise +++");
    return featureFlagsPromise;
  }
  
  featureFlagsPromise = new Promise((resolve) => {
    console.log("=== backEnd +++");
    setTimeout(() => {
      Cache.featureFlags = SAMPLE_FEATURES;
      Cache.timeStamp = Date.now();
      resolve(SAMPLE_FEATURES);
    }, 100);
  }).finally(() => {
    featureFlagsPromise = null;
  });
  return featureFlagsPromise;
}

function getFeatureState(featureName, defaultValue) {
  return fetchAllFeature()
    .then((featureFlags) => {
      return Object.hasOwn(featureFlags, featureName)
        ? featureFlags[featureName]
        : defaultValue;
    })
    .catch(() => defaultValue);
}

getFeatureState("show-pricing-v2", false).then((isEnabled) => {
  console.log(" ----- show-pricing-v2", isEnabled);
});

getFeatureState("show_dialog_box", false).then((isEnabled) => {
  console.log(" -----show_dialog_box", isEnabled);
});

setTimeout(() => {
  getFeatureState("enable_new_pricing", false).then((isEnabled) => {
    console.log(" ----- enable_new_pricing", isEnabled);
  });
}, 300);

getFeatureState("show_dialog_box", false).then((isEnabled) => {
  console.log(" -----show_dialog_box", isEnabled);
});

setTimeout(() => {
  getFeatureState("enable_new_pricing", false).then((isEnabled) => {
    console.log(" ----- enable_new_pricing", isEnabled);
  });
}, 200000);
