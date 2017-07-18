import { MyConferenceCliPage } from './app.po';

describe('my-conference-cli App', () => {
  let page: MyConferenceCliPage;

  beforeEach(() => {
    page = new MyConferenceCliPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
