<script>
        let paymentsClient;

        function onGooglePayLoaded() {
            paymentsClient = new google.payments.api.PaymentsClient({environment: 'TEST'});

            const isReadyToPayRequest = {
                apiVersion: 2,
                apiVersionMinor: 0,
                allowedPaymentMethods: [{
                    type: 'CARD',
                    parameters: {
                        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                        allowedCardNetworks: ['VISA', 'MASTERCARD']
                    }
                }]
            };

            paymentsClient.isReadyToPay(isReadyToPayRequest).then(response => {
                if (response.result) {
                    const button = paymentsClient.createButton({
                        onClick: onGooglePaymentButtonClicked
                    });
                    document.getElementById('gpay-button-container').appendChild(button);
                } else {
                    console.warn('Google Pay is not available');
                }
            }).catch(error => console.error('Error checking readiness:', error));
        }

        async function onGooglePaymentButtonClicked() {
            const paymentDataRequest = {
                apiVersion: 2,
                apiVersionMinor: 0,
                allowedPaymentMethods: [{
                    type: 'CARD',
                    parameters: {
                        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                        allowedCardNetworks: ['VISA', 'MASTERCARD']
                    },
                    tokenizationSpecification: {
                        type: 'PAYMENT_GATEWAY',
                        parameters: {
                            gateway: 'example', // Replace with actual payment gateway
                            gatewayMerchantId: 'your-merchant-id'
                        }
                    }
                }],
                merchantInfo: {
                    merchantId: 'your-merchant-id',
                    merchantName: 'Your Business Name'
                },
                transactionInfo: {
                    totalPriceStatus: 'FINAL',
                    totalPrice: '10.00',
                    currencyCode: 'USD'
                }
            };

            try {
                const paymentData = await paymentsClient.loadPaymentData(paymentDataRequest);
                console.log('Payment successful', paymentData);
            } catch (error) {
                console.error('Payment failed', error);
            }
        }
    </script>

