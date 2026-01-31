
const phone = document.getElementById("phone");
const amount = document.getElementById("amount");
const submitBtn = document.getElementById("submitBtn");
const message = document.getElementById("message");


submitBtn.addEventListener('click', async (e)=>{
    e.preventDefault();
    message.textContent = 'Loading...'

    try {
        await sendDetails();
        message.textContent = `✅STK push sent successfully to the phone: ${phone.value}`;
        message.style.color = 'green'

    } catch (error) {
        if(!amount.value || !phone.value){
            message.textContent = '❌All fields must be filled!!'
            message.style.color = 'red'
            throw new Error("Missing fields")
        }
        
        message.textContent = "❌ Failed to send STK push";
        message.style.color = "red";
        console.error(`${error.message}`);
    }
    
})
const sendDetails = async ()=> {

        if(!amount.value || !phone.value){
            message.textContent = '❌All fields must be filled!!'
            message.style.color = 'red'
            throw new Error("Missing fields")
        }

        const response = await fetch('/api/v1/stkpush',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    phone: phone.value,
                    amount: amount.value
                }
            )
        })

        const data = await response.json();

        if(!response.ok){
            throw new Error(data.message || "Server error");
        }
    
        return data;
}


