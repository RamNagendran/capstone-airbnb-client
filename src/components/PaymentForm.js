import React from 'react'
import "../styles/Form.css"
import { Tabs, TabPanels,  TabPanel } from '@chakra-ui/react'
import Paypal from './Paypal'

const PaymentForm = (props) => {

  let price = props.amount;
  let days = props.days;
  let placesName = props.place;

  return (
    <div>

      <div>

        <Tabs variant='soft-rounded' colorScheme='red' className='tabs-hold2'>
          <TabPanels>
            <TabPanel>
              <Paypal placeId={props.placeId} initialPrice={price} nameOfPlace={placesName} daysSelected={days} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>


    </div>
  )
}

export default PaymentForm