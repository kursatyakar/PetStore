describe('Petstore API Tests', () => {
  const baseUrl = 'https://petstore.swagger.io/v2';

  it('Scenario 0: Pet Post Check', ()=> {

    const newPet = {
      id: 3,
      name: 'PetCheck',
      status: 'available'
    };

    cy.request('POST', `${baseUrl}/pet`, newPet).then((response) => {
      console.log(response.body);
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id', newPet.id);
      expect(response.body).to.have.property('name',newPet.name);
      expect(response.body).to.have.property('status',newPet.status);
    });
  });

  it('Scenario 1: Add and Verify Pet', () => {
    const newPet = {
      id: 33,
      name: 'Kaju',
      status: 'available'
    };

    cy.request('POST', `${baseUrl}/pet`, newPet).then((response) => {
      console.log(response.body); // Debugging line
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id', newPet.id);
      expect(response.body).to.have.property('name', newPet.name);
      expect(response.body).to.have.property('status', newPet.status);
    });

    cy.request(`${baseUrl}/pet/${newPet.id}`).then((response) => {
      console.log(response.body); // Debugging line
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id', newPet.id);
      expect(response.body).to.have.property('name', newPet.name);
      expect(response.body).to.have.property('status', newPet.status);
    });
  });

  it('Scenario 2: Create and Login User', () => {
    const username = 'kursatyakar';
    const password = 'kursatyakar123';
    const newUser = {
      id: 13,
      username: username,
      firstName: 'kursat',
      lastName: 'yakar',
      email: 'kursat.yakar@virgosol.com',
      password: password,
      phone: '05379159675',
      userStatus: 1
    };

    cy.request('POST', `${baseUrl}/user`, newUser).then((response) => {
      console.log(response.body); // Debugging line
      expect(response.status).to.eq(200);
    });

    cy.request({
      method: 'GET',
      url: `${baseUrl}/user/login`,
      qs: {
        username: username,
        password: password
      }
    }).then((response) => {
      console.log(response.body); // Debugging line
      expect(response.status).to.eq(200);
    });
  });

  it('Scenario 3: Check Store Inventory', () => {
    cy.request(`${baseUrl}/store/inventory`).then((response) => {
      console.log(response.body); // Debugging line
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('available');
      expect(response.body).to.have.property('pending');
      expect(response.body).to.have.property('sold');
    });
  });

  it('Scenario 4: Create and Verify Order', () => {
    const newOrder = {
      id: 2001,
      petId: 1001,
      quantity: 2,
      shipDate: '2024-07-10T14:48:00.000Z',
      status: 'placed',
      complete: true
    };

    cy.request('POST', `${baseUrl}/store/order`, newOrder).then((response) => {
      console.log(response.body); // Debugging line
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id', newOrder.id);
      expect(response.body).to.have.property('petId', newOrder.petId);
      expect(response.body).to.have.property('quantity', newOrder.quantity);
      expect(response.body).to.have.property('status', newOrder.status);
    });

    cy.request(`${baseUrl}/store/order/${newOrder.id}`).then((response) => {
      console.log(response.body); // Debugging line
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id', newOrder.id);
      expect(response.body).to.have.property('petId', newOrder.petId);
      expect(response.body).to.have.property('quantity', newOrder.quantity);
      expect(response.body).to.have.property('status', newOrder.status);
    });
  });

  it('Scenario 5: Update and Delete Pet', () => {
    const petId = 1001;
    const updatedPet = {
      id: petId,
      name: 'Kaju Updated',
      status: 'sold'
    };

    cy.request('PUT', `${baseUrl}/pet`, updatedPet).then((response) => {
      console.log(response.body); // Debugging line
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id', updatedPet.id);
      expect(response.body).to.have.property('name', updatedPet.name);
      expect(response.body).to.have.property('status', updatedPet.status);
    });

    cy.request('DELETE', `${baseUrl}/pet/${petId}`).then((response) => {
      console.log(response.body); // Debugging line
      expect(response.status).to.eq(200);
    });

    cy.request({
      method: 'GET',
      url: `${baseUrl}/pet/${petId}`,
      failOnStatusCode: false
    }).then((response) => {
      console.log(response.body); // Debugging line
      expect(response.status).to.eq(404);
    });
  });
});
