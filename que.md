How to implement feature flag functionality? Atlassian Frontend Interview Question

# In this question, we need to implement a functionality that can be used to show different features to different users. It is commonly known as A/B testing. We need to build a common utility on frontend that can be used by the entire web-app to get the status of a feature flag. Assume that the BE is pre-built and a mock function is provided for it.

## Functional Requirements
getFeatureState should return the value of the provided feature flag.

In case, flag is missing in the response or there is an error, return the provided default value.

getFeatureState should support caching with a ttl and minimize calls to backend APIs.


>Syntax

getFeatureState(featureName: string, defaultValue: boolean): Promise<boolean>;
Arguments
featureName (string): The name of the feature flag for which we need the status.
defaultValue (boolean): The optional default value that would be returned by the utility function in case of error or as a fallback.
Return
A promise where then callback receives the feature flag value or the provided default value.


>Example


`getFeatureState("show-pricing-v2")
  .then(function(isEnabled) {
    if (isEnabled) {
      showPricingV2();
    } else {
      showOldPricing();
    }
});`


`getFeatureState("show-redesigned-dialog")
  .then(function(isEnabled) {
    if (isEnabled) {
      showRedesignedDialog();
    }
});`
