/// <reference types="cypress" />

import { MANAGE, MENU, PURCHASE } from '../../fixtures/dom';

context('상품 관리', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
    cy.get(MENU.PRODUCT).click();

    const spy = cy.spy().as('alert');
    cy.on('window:alert', spy);
  });

  it('상품 이름과 또는 상품 가격 둘 중에 하나만 입력한 경우 상품 등록이 불가능하다.', () => {
    const name = '촉촉한초코칩';

    cy.get(MANAGE.ADD_NAME).type(name);
    cy.get(MANAGE.ADD_BUTTON).click();

    cy.get('@alert').should('have.been.calledOnce');
  });

  it('중복된 상품 이름, 상품 이름이 1자인 경우, 상품 이름이 20자를 초과해서 입력한 경우 상품 등록이 불가능하다.', () => {
    const name1 = '사이다';
    const name2 = '물';
    const name3 = '일이삼사오육칠팔구십일이삼사오육칠팔구십일';
    const price = 1000;

    [name1, name2, name3].forEach((value) => {
      console.log('test');
      cy.get(MANAGE.ADD_NAME).type(value);
      cy.get(MANAGE.ADD_PRICE).type(price);
      cy.get(MANAGE.ADD_BUTTON).click();

      cy.get('@alert').should('have.been.called');
    });
  });

  it('상품 가격이 10원 미만, 50000원 초과 상품을 입력할 경우 상품 등록이 불가능하다.', () => {
    const price1 = 9;
    const price2 = 100000;
    const name = '칙촉';

    [price1, price2].forEach((value) => {
      cy.get(MANAGE.ADD_NAME).type(name);
      cy.get(MANAGE.ADD_PRICE).type(value);
      cy.get(MANAGE.ADD_BUTTON).click();

      cy.get('@alert').should('have.been.called');
    });
  });

  it('특정 상품을 삭제할 경우 해당 상품이 상품 품목에서 사라진다.', () => {
    cy.get(MANAGE.PRODUCT_NAME)
      .first()
      .then(($name) => {
        const name = $name.text();

        cy.get(MANAGE.DELETE_BUTTON).first().click();
        cy.get(MANAGE.PRODUCT_NAME).should('not.have', name);
      });
  });

  it('특정 상품을 삭제한 이후, 상품 구매 페이지를 가면 해당 상품이 존재하지 않는다.', () => {
    cy.get(MANAGE.PRODUCT_NAME)
      .first()
      .then(($name) => {
        const name = $name.text();

        cy.get(MANAGE.DELETE_BUTTON).first().click();
        cy.get(MENU.PURCHASE).click();

        cy.get(PURCHASE.PRODUCT_NAME).should('not.have', name);
      });
  });
});
