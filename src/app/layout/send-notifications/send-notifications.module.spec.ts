import { SendNotificationsModule } from './send-notifications.module';

describe('SendNotificationsModule', () => {
  let sendNotificationsModule: SendNotificationsModule;

  beforeEach(() => {
    sendNotificationsModule = new SendNotificationsModule();
  });

  it('should create an instance', () => {
    expect(sendNotificationsModule).toBeTruthy();
  });
});
