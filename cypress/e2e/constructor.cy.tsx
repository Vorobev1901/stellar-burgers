describe('Проверка моковых данных ответа на запрос данных пользователя: ', () => {

  const URL = 'https://norma.nomoreparties.space/api';


  //Перехват запроса на эндпоинт api/ingredients, в ответе на который возвращаются созданные моковые данные из ingredients.json.
  beforeEach(() => {
    cy.visit('/');
    cy.intercept("GET", `${URL}/ingredients`, {
      fixture: "ingredients.json",
    });

    cy.intercept("POST", `${URL}/auth/login`, {
      fixture: "loginUser.json",
    })
  });

  it('Проверка регистрации:', () => {
    cy.intercept("POST", `${URL}/auth/register`, {
      fixture: "registerUser.json",
    });

    cy.get('header').contains('Личный кабинет');
    cy.visit('/register');

    // Commands.add - "register"
    cy.register('Никита123', 'test1@list.ru', '123456');
  });

  it('Проверка входа в личный кабинет:', () => {
    cy.get('header').contains('Личный кабинет');
    cy.visit('/login');

    // Commands.add - "login"
    cy.login('test1@list.ru', '123456');

    cy.fixture('loginUser').its('user').then((user) => {
      const name = user.name;
      cy.get('header').contains(name);
    });

  });

  it('Проверка выхода из личного кабинета:', () => {
    cy.intercept("POST", `${URL}/auth/logout`, {
      fixture: "logoutUser.json",
    })

    cy.get('header').contains('Личный кабинет').as('buttonProfile');
    cy.visit('/login');

    // Commands.add - "login"
    cy.login('test1@list.ru', '123456');

    // Проверка, что пользователь авторизован
    cy.fixture('loginUser').its('user').then((user) => {
      const name = user.name;

      // Commands.add - "clickLink"
      cy.clickLink(name);
      cy.location('pathname').should('eq', '/profile');
      // Commands.add - "clickButton"
      cy.clickButton('Выход');
      cy.location('pathname').should('eq', '/login');
      cy.get('@buttonProfile');
    });

  });

});

describe('Проверяем работу конструктора бургера и оформление заказа: ', () => {

  const URL = 'https://norma.nomoreparties.space/api';

  beforeEach(() => {
    cy.visit('/');
    cy.intercept("GET", `${URL}/ingredients`, {
      fixture: "ingredients.json",
    });
    cy.intercept("POST", `${URL}/auth/login`, {
      fixture: "loginUser.json",
    });
    cy.intercept("POST", `${URL}/orders`, {
      fixture: "orderBurger.json",
    });
  });

  it('Добавление одного ингредиента, булок и начинок, оформление заказа:', () => {

    cy.get('div').contains('Выберите булки').as('bunEmpty');
    cy.get('div').contains('Выберите начинку').as('fillingEmpty');

    cy.fixture('ingredients').its('data').then((data) => {
      const bunName = data[0].name;
      const bunPrice = data[0].price;
      const bunImage = data[0].image;
      const fillingName = data[1].name;
      const fillingPrice = data[1].price;

      cy.get('ul li:first').as('bun');
      cy.get('@bun').contains('p', bunPrice);
      cy.get('@bun').contains('p', bunName);
      cy.get('@bun').find('img').should('have.attr', 'src').should('include', bunImage);

      cy.clickButton('Добавить');

      // Булки отображаются
      cy.get('.constructor-element_pos_top').as('bunTop');
      cy.get('.constructor-element_pos_bottom').as('bunBottom');

      cy.get('@bunTop').contains('.constructor-element__text', bunName);
      cy.get('@bunTop').find('img').should('have.attr', 'src').should('include', bunImage);
      cy.get('@bunTop').contains('.constructor-element__price', bunPrice);

      cy.get('@bunBottom').contains('.constructor-element__text', bunName);
      cy.get('@bunBottom').find('img').should('have.attr', 'src').should('include', bunImage);
      cy.get('@bunBottom').contains('.constructor-element__price', bunPrice);

      // Начинка отображается
      cy.get('ul').siblings('h3').contains('Начинки').next().find('li:first').as('filling');
      cy.get('@filling').contains('p', fillingName);
      cy.get('@filling').contains('p', fillingPrice);
      // добавление начинки по клику
      cy.get('@filling').contains('button', 'Добавить').click();

      // Начинки добавились в конструктор
      cy.get('.constructor-element').contains('.constructor-element__text', fillingName);
      cy.get('.constructor-element').contains('.constructor-element__price', fillingPrice);

      // Оформление
      cy.clickButton('Оформить заказ');

      // Переадресация на страницу личного кабинета
      cy.get('header').contains('Личный кабинет');
      cy.location('pathname').should('eq', '/login');

      // Commands.add - "login"
      cy.login('test1@list.ru', '123456');

      // Оформление
      cy.clickButton('Оформить заказ');
      cy.get('#modals').should('not.be.empty');

      // Номера заказа в модальном окне
      cy.fixture('orderBurger').its('order').then((data) => {
        const number = data.number;
        cy.get('#modals h2').should('have.text', number);
      });

      // Закрытие модального окна
      cy.get('#modals button').click(); 
      cy.get('#modals').should('be.empty');
      cy.location('pathname').should('eq', `/`);

      // Контструктор пустой
      cy.get('@bunEmpty');
      cy.get('@fillingEmpty');
    });
  });

});

describe('Проверка модального окна', () => {

  const URL = 'https://norma.nomoreparties.space/api';

  beforeEach(() => {
    cy.visit('/');
    cy.intercept("GET", `${URL}/ingredients`, {
      fixture: "ingredients.json",
    })
  });

  it('Проверка работы модального окна ингредиента:', () => {
    cy.get('ul li:first').as('bun');
    cy.get('#modals').as('modals');
    
    cy.get('@bun').click();
    cy.get('@modals').should('not.be.empty');

    // Содержимое модального окна
    cy.fixture('ingredients').its('data').then((data) => {
      const id = data[0]._id;
      const name = data[0].name;
      cy.location('pathname').should('eq', `/ingredients/${id}`);
      cy.get('#modals h3:last').should('have.text', name);
    });

    // Закрытие по клику на крестик
    cy.get('#modals button').click();
    cy.get('@modals').should('be.empty');
    cy.location('pathname').should('eq', `/`);

    // Закрытие по клику на оверлей
    cy.get('@bun').click();
    cy.get('@modals').should('not.be.empty');
    cy.get('#modals div:last').click({ force: true });
    cy.get('@modals').should('be.empty');
    cy.location('pathname').should('eq', `/`);
  });

})


