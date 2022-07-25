describe("Initial page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Renders 8 items", () => {
    cy.get('[data-testid="container"]').contains(
      "Roasted Vegetable & Black Bean Tacos"
    );
    cy.get('[data-testid="container"]').contains(
      "Kale & Avocado Salad with Blueberries & Edamame"
    );
    cy.get('[data-testid="container"]').contains(
      "Garlic-Anchovy Pasta with Broccolini"
    );
    cy.get('[data-testid="container"]').contains("Creamy Spinach Pasta");
    cy.get('[data-testid="container"]').contains(
      "Quinoa, Avocado & Chickpea Salad over Mixed Greens"
    );
    cy.get('[data-testid="container"]').contains(
      "One-Pot Lemon-Broccoli Pasta with Parmesan"
    );
    cy.get('[data-testid="container"]').contains("Crispy Fish Taco Bowls");
    cy.get('[data-testid="container"]').contains("Salmon & Avocado Poke Bowl");
  });

  it("Modal is opened on card click and data is rendered correctly", () => {
    cy.get(':nth-child(1) > [data-testid="card"] > .rounded').click();

    cy.get(".ReactModal__Content").should("exist");
    cy.get(".ReactModal__Content")
      .find(":nth-child(1)")
      .contains(
        "Combine roasted root vegetables, beans, oil, cumin, chili powder, coriander, salt and pepper in a saucepan. Cover and cook over medium-low heat until heated through, 6 to 8 minutes."
      );
    cy.get(".ReactModal__Content")
      .find(":nth-child(2)")
      .contains(
        "Divide the mixture among the tortillas. Top with avocado. Serve with lime wedges. Garnish with cilantro and/or salsa, if desired."
      );
  });

  it("Modal is closed on X click", () => {
    cy.get(':nth-child(1) > [data-testid="card"] > .rounded').click();
    cy.get(".ReactModal__Content").should("exist");
    cy.get(".closeBtn > .svg-inline--fa").click();
    cy.get(".ReactModal__Content").should("not.exist");
  });

  it("Ingredients show up on search", () => {
    
    cy.get('[data-testid="navbarContainer"]')
      .find(":nth-child(2)")
      .contains("Filter ingredients")
      .click()
      .type("pasta")
      .get('[data-testid="comboOption"]').click()

      cy.get('[data-testid="container"]').contains(
        "Garlic-Anchovy Pasta with Broccolini"
      );
      cy.get('[data-testid="container"]').contains(
        "Creamy Spinach Pasta"
      );
      cy.get('[data-testid="container"]').contains(
        "One-Pot Lemon-Broccoli Pasta with Parmesan"
      );
  });

});
