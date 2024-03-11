/**
 * @description
 * Mixpanel event we will pass this event to our own backend that is used as a proxy for Mixpanel. Almost everything is optional. The only required field is `event`.
 * the other properties are suggestions for a "normal" event.
 * @example
 *  const event: MixpanelEvent = {
 *      event: 'Contact', // e.g. "Update profile", "Add to cart", "Purchase", "Page view"
 *      context: { // Give some context to the event. Where is it triggered and by who
 *          title: 'Product Page', // What page is the event triggered on
 *          path: '/product/123', // Make sure there aren't any personal info in the path
 *          href: 'https://www.example.com/product/123', // Make sure there aren't any personal info in the href
 *          route: '/product/:id',
 *          audience: 'Freelancer', // Who is triggering this event e.g. a role or "new user"
 *          section: 'footer', // What section is the event triggered in
 *      },
 *      utm_source: 'Facebook', // track the source where traffic is coming from, including a website or advertiser
 *      utm_medium: 'advertising', // track the advertising medium, including email and banner ads
 *      utm_campaign: 'Black friday', // track the campaign name associated with the traffic
 *      utm_content: 'cta button', //track the specific link within in an ad that a user clicked
 *      utm_term: 'tv sale', // track keywords associated with campaigns
 *      product_id: '123', // Any other properties that you want to add to the event
 * }
 */
export type MixpanelEvent = {
    /** e.g. "Update profile", "Add to cart", "Purchase", "Page view" */
    event: string;
    /** Give some context to the event. Where is it triggered and by who */
    context?: {
        /** What page is the event triggered on e.g. Product Page */
        title?: string;
        /** What is the path of the page e.g. /product/123 <- Make sure there aren't any personal info in the path */
        path?: string;
        /** What is the href of the page e.g. https://www.example.com/product/123 <- Make sure there aren't any personal info in the href */
        href?: string;
        /** What is the route of the page e.g. /product/:id  */
        route?: string;
        /** Who is triggering this event e.g. a role or "new user" */
        audience?: string;
        /** What section is the event triggered in e.g. footer or main menu */
        section?: string;
        /** Is this event triggered in a standalone PWA? */
        pwa?: boolean;
    };
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
    /** Any other properties that you want to add to the event */
    [key: string]: unknown;
};
