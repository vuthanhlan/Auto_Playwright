import {test, expect} from '@playwright/test'
 import { request } from 'http'


test('Get users', async({request})=>{
    const newUser={
        "id": 10,
        "username": "theUser",
        "firstName": "John",
        "lastName": "James",
        "email": "john@email.com",
        "password": "12345",
        "phone": "12345",
        "userStatus": 1
    }
    const response= await request.get('https://petstore3.swagger.io/api/v3/user/theUser', {data: newUser})
    
    console.log(await response.json())
    expect(response.status()).toBe(200)
    const responseData = await response.json()

    expect(responseData.username).toBe(newUser.username)
    expect (responseData.firstName).toBe(newUser.firstName)
    expect(responseData.lastName).toBe(newUser.lastName)
    expect(responseData.email).toBe(newUser.email)
    expect(responseData.password).toBe(newUser.password)
    expect(responseData.phone).toBe(newUser.phone)
    expect(responseData.userStatus).toBe(newUser.userStatus)
    

})

test('Post user', async({request})=>{
    const newUser ={
        
            "id": 11,
            "username": "theUser",
            "firstName": "John",
            "lastName": "James",
            "email": "john@email.com",
            "password": "12345",
            "phone": "12345",
            "userStatus": 1
        
    }
    const response= await request.post('https://petstore3.swagger.io/api/v3/user',{data: newUser})
    expect(response.status()).toBe(500)

    const responseData = await response.json()
    // expect(responseData.username).toBe(newUser.username)
    console.log(responseData)
    // expect(responseData.firstName).toBe(newUser.firstName)
    // expect(responseData.lastName).toBe(newUser.lastName)
    // expect(responseData.email).toBe(newUser.email)
    // expect(responseData.password).toBe(newUser.password)
    // expect(responseData.phone).toBe(newUser.phone)
    // expect(responseData.userStatus).toBe(newUser.userStatus)
})


test('Delete pet', async({request})=>{
    const response= await request.delete('https://petstore3.swagger.io/api/v3/pet/10')
    expect(response.status()).toBe(200);
    const responseBody= await response.text() // Get response by text
    console.log(responseBody)
    expect(responseBody).toBe('Pet deleted')

    //Kiểm tra xem pet đã bị xóa chưa
    const getResponse= await request.get('https://petstore3.swagger.io/api/v3/pet/10')
    expect(getResponse.status()).toBe(404)
})

// test('Verify that a client can create a new property through the "Get a Quote" process.',
//     {
//       annotation: {
//         type: "TC_GQ_01",
//         description: `
//           Precondition: 
//         - The client is logged in to the Nutrien DCI Website
          
//           Test data: 
//         - Farm name: Farm 2
//         - Address: Byron Bay, New South Wales, Australia, 2481
//         - Local Government Area: Byron
  
//           Test steps:
//         1. Log into the Nutrien DCI system.
//         2. Navigate to 'Get a Quote'.
//         3. In the Farm information section, enter Farm name, Address as test data
//         4. Select Local Government Area as test data
//         5. Click 'Save Property'
//         6. Navigate to My Dashboard, select Saved Properties tab
//         7. Observe
    
//           Expected results:
//           - The system saves and displays properties created under 'Saved Properties' page
//       `
//     }
//   }, async ({ page }) => { 
//     await page.goto('https://www.google.com')
//   });

  