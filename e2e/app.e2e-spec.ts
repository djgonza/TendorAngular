import { TendorPage } from './app.po';

describe('tendor App', () => {
  let page: TendorPage;

  beforeEach(() => {
    page = new TendorPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
