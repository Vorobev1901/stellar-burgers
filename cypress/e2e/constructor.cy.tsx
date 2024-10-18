describe('Проверка моковых данных ответа на запрос данных пользователя: ', () => {

  const URL = 'https://norma.nomoreparties.space/api';

  //Перехват запроса на эндпоинт api/ingredients, в ответе на который возвращаются созданные моковые данные из ingredients.json.
  beforeEach(() => {
    cy.visit('http://localhost:4000/');
    cy.intercept("GET", `${URL}/ingredients`, {
      fixture: "ingredients.json",
    })
  });

  it('Проверка регистрации:', () => {

    // Проверка, что пользователь не авторизован
    cy.get('header').contains('Личный кабинет');

    cy.visit('http://localhost:4000/register');
    // Мокирование запроса логина
    cy.intercept("POST", `${URL}/auth/register`, {
      fixture: "registerUser.json",
    })

    cy.get('input[name="name"]').type('Никита123');
    cy.get('input[name="email"]').type('test1@list.ru');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();
    cy.location('pathname').should('eq', '/');

    // Проверка, что пользователь авторизован
    cy.fixture('registerUser').its('user').then((user) => {
      const name = user.name;

      cy.get('header').contains(name);
    });

  });

  it('Проверка входа в личный кабинет:', () => {

    // Проверка, что пользователь не авторизован
    cy.get('header').contains('Личный кабинет');

    cy.visit('http://localhost:4000/login');
    // Мокирование запроса логина
    cy.intercept("POST", `${URL}/auth/login`, {
      fixture: "loginUser.json",
    })

    cy.get('input[name="email"]').type('test1@list.ru');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();
    cy.location('pathname').should('eq', '/');

    // Проверка, что пользователь авторизован
    cy.fixture('loginUser').its('user').then((user) => {
      const name = user.name;

      cy.get('header').contains(name);
    });

  });

  it('Проверка выхода из личного кабинета:', () => {
    // Мокирование запроса логина
    cy.intercept("POST", `${URL}/auth/login`, {
      fixture: "loginUser.json",
    })

    cy.intercept("POST", `${URL}/auth/logout`, {
      fixture: "logoutUser.json",
    })

    // Проверка, что пользователь не авторизован
    cy.get('header').contains('Личный кабинет');

    cy.visit('http://localhost:4000/login');

    cy.get('input[name="email"]').type('test1@list.ru');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();
    cy.location('pathname').should('eq', '/');

    // Проверка, что пользователь авторизован
    cy.fixture('loginUser').its('user').then((user) => {
      const name = user.name;

      // Проверка выхода из лк
      cy.get('header').contains(name).click();
      cy.location('pathname').should('eq', '/profile');
      cy.get('button').contains('Выход').click();
      cy.location('pathname').should('eq', '/login');
      cy.get('header').contains('Личный кабинет');
    });

  });

});

describe('Проверяем работу конструктора бургера и оформление заказа: ', () => {

  const URL = 'https://norma.nomoreparties.space/api';

  //Перехват запроса на эндпоинт api/ingredients, в ответе на который возвращаются созданные моковые данные из ingredients.json.
  beforeEach(() => {
    cy.visit('http://localhost:4000/');
    cy.intercept("GET", `${URL}/ingredients`, {
      fixture: "ingredients.json",
    })
  });

  it('Добавление одного ингредиента, булок и начинок. Оформление заказа', () => {
    cy.intercept("POST", `${URL}/auth/login`, {
      fixture: "loginUser.json",
    });

    cy.intercept("POST", `${URL}/orders`, {
      fixture: "orderBurger.json",
    })

    // Проверка, контструктор пустой
    cy.get('div').contains('Выберите булки');
    cy.get('div').contains('Выберите начинку');

    cy.fixture('ingredients').its('data').then((data) => {
      const bunName = data[0].name;
      const bunPrice = data[0].price;
      const bunImage = data[0].image;

      // Проверка, все ингредиенты возвращаются из созданных моковых данных
      cy.get('ul li:first').contains('p', bunPrice);
      cy.get('ul li:first').contains('p', bunName);
      cy.get('ul li:first').find('img').should('have.attr', 'src').should('include', bunImage);
      // добавление булок по клику
      cy.get('ul li:first').contains('button', 'Добавить').click();

      // Проверка, что булки добавились в конструктор 
      cy.get('.constructor-element_pos_top').contains('.constructor-element__text', bunName);
      cy.get('.constructor-element_pos_top').find('img').should('have.attr', 'src').should('include', bunImage);
      cy.get('.constructor-element_pos_bottom').contains('.constructor-element__text', bunName);
      cy.get('.constructor-element_pos_bottom').find('img').should('have.attr', 'src').should('include', bunImage);
      cy.get('.constructor-element_pos_top').contains('.constructor-element__price', bunPrice);
      cy.get('.constructor-element_pos_bottom').contains('.constructor-element__price', bunPrice);

      // Проверка, что начинка отображается

      const fillingName = data[1].name;
      const fillingPrice = data[1].price;

      cy.get('ul').siblings('h3').contains('Начинки');
      cy.get('ul').siblings('h3').contains('Начинки').next().find('li:first').contains('p', fillingName);
      cy.get('ul').siblings('h3').contains('Начинки').next().find('li:first').contains('p', fillingPrice);
      // добавление начинки по клику
      cy.get('ul').siblings('h3').contains('Начинки').next().find('li:first').contains('button', 'Добавить').click();

      // Проверка, что начинки добавились в конструктор
      cy.get('.constructor-element').contains('.constructor-element__text', fillingName);
      cy.get('.constructor-element').contains('.constructor-element__price', fillingPrice);


      // Оформление заказа
      cy.get('button').contains('Оформить заказ').click();

      // Редирект на логин, если не авторизован
      cy.get('header').contains('Личный кабинет');

      cy.location('pathname').should('eq', '/login');
      // Авторизация
      cy.get('input[name="email"]').type('test1@list.ru');
      cy.get('input[name="password"]').type('123456');
      cy.get('button[type="submit"]').click();
      cy.location('pathname').should('eq', '/');

      cy.get('button').contains('Оформить заказ').click();
      cy.get('#modals').should('not.be.empty');

      // Проверка, верный ли заказ
      cy.fixture('orderBurger').its('order').then((data) => {
        const number = data.number;

        cy.get('#modals h2').should('have.text', number);
      });

      // Проверка закрытия модалки
      cy.get('#modals button').click();
      cy.get('#modals').should('be.empty');
      cy.location('pathname').should('eq', `/`);

      // Проверка, что контструктор пустой
      cy.get('div').contains('Выберите булки');
      cy.get('div').contains('Выберите начинку');
    });
  });

});

describe('Проверка модального окна', () => {

  const URL = 'https://norma.nomoreparties.space/api';

  //Перехват запроса на эндпоинт api/ingredients, в ответе на который возвращаются созданные моковые данные из ingredients.json.
  beforeEach(() => {
    cy.visit('http://localhost:4000/');
    cy.intercept("GET", `${URL}/ingredients`, {
      fixture: "ingredients.json",
    })
  });

  it('Проверка работы модального окна ингредиента:', () => {

    // открытие модального окна ингредиента:
    cy.get('ul li:first').click();
    // проверка, что окно не пустое
    cy.get('#modals').should('not.be.empty');

    // проверка содержания модального окна
    cy.fixture('ingredients').its('data').then((data) => {
      const id = data[0]._id;
      const name = data[0].name;

      cy.location('pathname').should('eq', `/ingredients/${id}`);
      cy.get('#modals h3:last').should('have.text', name);
    });

    // закрытие по клику на крестик:
    cy.get('#modals button').click();
    // проверка, что окно пустое
    cy.get('#modals').should('be.empty');
    cy.location('pathname').should('eq', `/`);

    // закрытие по клику на оверлей (желательно):
    cy.get('ul li:first').click();
    cy.get('#modals').should('not.be.empty');

    cy.get('#modals div:last').click({ force: true });
    cy.get('#modals').should('be.empty');
    cy.location('pathname').should('eq', `/`);
  });

})


