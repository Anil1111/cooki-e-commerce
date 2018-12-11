import React from 'react';
import {render} from 'react-dom';
import ProductBannerItem from "./productBannerItem.jsx";

const ProductsBanner = () => {

    let descriptions = {
        cookies: 'Cookie Stop\'s cookies are made with so much love that you can feel it in every bite! Not only that. ' +
            'But, these scrumptious pieces of delight are not only good for your taste buds they are also good ' +
            'for your health.',
        cookieSandwiches: 'Cookie Stop\'s cookie sandwiches are the real deal! These cookies are made to redefine ' +
            'delicious and aim to satisfy you with every bite you take. So what are you waiting for? Drop everything, ' +
            'get ready and take a bite',
        partner: 'Seeking menu inspiration or on-the-go options? Team up with our bakers to bring dynamic, ' +
            'better-for-you flavors to your customers.'
    };

    return (
        <div className={'d-flex justify-content-center align-items-center flex-column w-75-100 p-3'}>
            <div className="container d-flex justify-content-center align-items-center flex-column mb-2"
                 id={'products-header'}>
                <p className="text-emphasize-large font-weight-bold mb-4">Products</p>
                <p className="w-40-100 text-center">
                    From flavorful menu creations to grab-and-go innovations, you won't believe what's being crafted in
                    Cookie Stop's ovens. You and your guests will love the endless, better-for-you possibilities.
                </p>
            </div>
            <div className="d-flex justify-content-center align-items-center flex-mobile-column container p-0 my-3">
                <ProductBannerItem size={'regular'}
                                   image={'/images/cb01-S.png'}
                                   title={'Cookies'}
                                   primaryButtonText={'Cookies'}
                                   secondaryButtonText={'Download spec sheet'}
                                   description={descriptions.cookies}
                                   primaryButtonLink={'products/cookies/overview'}
                                   id={'serve-cookies'}/>
                <ProductBannerItem size={'regular'}
                                   image={'https://babcockhalldairystore.wisc.edu/wp-content/uploads' +
                                   '/2017/09/Ice-Cream-Sandwich-transparent-background900x600.png'}
                                   title={'Cookie Sandwiches'}
                                   primaryButtonText={'Cookie Sandwiches'}
                                   secondaryButtonText={'Download spec sheet'}
                                   description={descriptions.cookieSandwiches}
                                   id={'serve-ice'}/>
            </div>

            <ProductBannerItem
                image={'https://images.unsplash.com/photo-1464979681340-bdd28a61699e?ixlib=rb-0.3.5&ixid=' +
                'eyJhcHBfaWQiOjEyMDd9&s=9962230a1213bfd754ed20ae96114c04&auto=format&fit=crop&w=1350&q=80'}
                title={'Partner with us'}
                primaryButtonText={'Contact us'}
                description={descriptions.partner}
                id={'partner-banner'}/>
        </div>
    );
};

render(<ProductsBanner/>, document.querySelector('#title-banner'));