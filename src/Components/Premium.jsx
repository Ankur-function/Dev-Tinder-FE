import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useState } from "react"

const Premium = () => {

    const [isPremiumUser,setIsPremiumUser] = useState(false);

    const verifyPremiumUser = async() => {
        const resp = await axios.get(`${BASE_URL}/payment/premium/verify`,{withCredentials:true});
        console.log(resp);
        
        setIsPremiumUser(resp.data.isPremiumUser)
    }

const handlePaymentForm = async(type) => {
    try {
        const order = await axios.post(`${BASE_URL}/payment/createOrder`,{membershipType:type},{withCredentials:true});
        console.log(order);

        const {notes,amount,currency,orderId} = order.data.data;
            const options = {
        key: order.data.keyId, // Replace with your Razorpay key_id
        amount: amount, // Amount is in currency subunits.
        currency: currency,
        name: 'Dev Tinder',
        description: 'Testing payment of my devTinder app',
        order_id: orderId, // This is the order_id created in the backend
        prefill: {
          name: notes.firstName + notes.lastName,
          email: notes.email,
          contact: '1234567890'
        },
        theme: {
          color: '#F37254'
        },
        handler: verifyPremiumUser
      };
         const rzp = new window.Razorpay(options);
        rzp.open();
        
    } catch (error) {
        console.log(error);
        
    }
}
    return isPremiumUser ? 'User Is a Premium Member' :(
        <div className="m-10">
            <div className="flex w-full flex-col lg:flex-row">
  <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
    <h1 className="font-bold text-3xl">Silver Membership</h1>
    <ul>
        <li>- Chat with other people</li>
        <li>- 100 connection requests per day</li>
        <li>- Blue Tick</li>
        <li>- 3 Months</li>
    </ul>
    <button onClick = {()=>{handlePaymentForm('Silver')} } className="btn-secondary">Buy Silver</button>
    </div>
  <div className="divider lg:divider-horizontal">OR</div>
  <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
    <h1  className="font-bold text-3xl">Gold Membership</h1>
    <ul>
        <li>- Chat with other people</li>
        <li>- Unlimited connection requests per day</li>
        <li>- Blue Tick</li>
        <li>- 6 Months</li>
    </ul>
    <button onClick = {()=>{handlePaymentForm('Gold')} }className="btn-primary">Buy Gold</button>
    </div>
</div>
        </div>
    )
}

export default Premium
