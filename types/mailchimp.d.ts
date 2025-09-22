declare module '@mailchimp/mailchimp_marketing' {
  interface MailchimpConfig {
    apiKey: string;
    server: string;
  }

  interface AddListMemberRequest {
    email_address: string;
    status: 'subscribed' | 'unsubscribed' | 'cleaned' | 'pending';
    merge_fields?: {
      FNAME?: string;
      LNAME?: string;
      [key: string]: any;
    };
  }

  interface AddListMemberResponse {
    id: string;
    email_address: string;
    status: string;
  }

  interface MailchimpAPI {
    setConfig(config: MailchimpConfig): void;
    lists: {
      addListMember(listId: string, memberData: AddListMemberRequest): Promise<AddListMemberResponse>;
    };
  }

  const mailchimp: MailchimpAPI;
  export = mailchimp;
}
