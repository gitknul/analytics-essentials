# FH analytics essentials

This is a repo with react components that help you implement analytics in your web app according to our standards. It is a work in progress and we are adding more components as we go.

## Prerequisites

- [ ] You have a Google Analytics account or Piwik account

For Google Analytics

- [ ] You have implemented Google Tag Manager on your site and analytics is loaded via GTM

For A/B testing

- [ ] You have implemented Google Optimize on your site

## A/B testing and multivariant testing

Currently we only have a working solution for Google Optimize.

### How to use

1. Set up an A/B test or MV test in Google Optimize. During testing you should set the Editor to http://localhost:[port]. This is used when you want to preview a version locally. It's best to also set a starting event following the following format: optimize.activate-[string]

2. Start by wrapping the ExperimentContextProvider around your app. This will handle the loading of optimize centrally and make it available to all components that need it. If your website is using anything that needs to be ready e.g. you want to wait until cookies are accepted set isBlocked prop of the provider to true.

3. Set up an experiments object following the Experiment type. You can import it from @freshheads/analytics-essentials/src/google/constants/experiment. This object should contain all the experiments you want to use in your app.

   ```javascript
   export const experiments: Experiments = {
     mvt: {},
     ab: {
       abExample: {
         id: "{experiment-ID-from-optimize}",
         activationEvent: "optimize.activate-example",
       },
     },
   };
   ```

4. Now you can get a variant in any component as follows:

   - AB test:

     ```javascript
     const Variants = [<VariantA />, <VariantB />, <VariantC />];

     const experiment = experiments.ab.abExample;

     const { isLoading, result: AbExampleResult } = useAbTest(
       experiment,
       Variants
     );
     ```

   - MV test:

     ```javascript
     const reviewVariants = [undefined, <ReviewB />, <ReviewC />];
     const buttonVariants = [<ButtonA />, <ButtonB />, <ButtonC />];

     const experiment = experiments.mvt.mvtExample;

     const { isLoading: reviewLoading, result: ReviewResult } =
       useMultiVariantTest(
         experiment,
         reviewVariants,
         getMvtSectionByName("reviews", experiment)
       );

     const { isLoading: buttonLoading, result: ButtonResult } =
       useMultiVariantTest(
         experiment,
         buttonVariants,
         getMvtSectionByName("different-buy-buttons", experiment)
       );
     ```

   5. Now you can directly use the returned component anywhere by using `{ButtonResult}` or `{ReviewResult}` for the MV test or `{AbExampleResult}` for the AB test. You can also use the isLoading boolean to show a loading state.
