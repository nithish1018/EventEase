describe("Event Ease tests", () => {
    beforeEach(() => {
      cy.request("POST", "http://localhost:3030/api/users/signup", {
         name:"Nithish",
        email:"nithish18@gmail.com",
        password:"123456789"
      });
    });

  
    it("Create a new post", () => {
        cy.request("POST", "http://localhost:3030/api/users/signup", {
            name:"Nithish",
            email:"nithish18@gmail.com",
            password:"123456789"
        })
          .its("status")
          .should("eq", 200);
      });
    it("Create a new post", () => {
      cy.request("POST", "http://localhost:3030/api/users/login", {
        email:"nithish18@gmail.com",
        password:"123456789"
      })
        .its("status")
        .should("eq", 200);
    });

  });