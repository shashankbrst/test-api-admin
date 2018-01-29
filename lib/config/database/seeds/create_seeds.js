exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries first.
  // DO NOT change the order of delete tables rows. Otherwise Foreign Keys will mess up.
  return knex('customers_messages')
    .del()
    .then(() => knex('responses').del())
    .then(() => knex('typelinks').del())
    .then(() => knex('oauth_refresh_tokens').del())
    .then(() => knex('oauth_access_tokens').del())
    .then(() => knex('oauth_authorization_codes').del())
    .then(() => knex('oauth_clients').del())
    .then(() => knex('messages').del())
    .then(() => knex('conversations_audiences').del())
    .then(() => knex('customers_audiences').del())
    .then(() => knex('customer_infos').del())
    .then(() => knex('is_muted').del())
    .then(() => knex('audiences').del())
    .then(() => knex('conversations').del())
    .then(() => knex('templates').del())
    .then(() => knex('users').del())
    .then(() => knex('billing_plans_organizations').del())
    .then(() => knex('billing_plans').del())
    .then(() => knex('organizations').del())
    .then(() => knex('customers').del())
    .then(() => knex('oauth_scopes').del())
    .then(function() {
      // Inserts seed entries
      return knex('organizations').insert([
        {
          id: 1,
          name: 'Test Org',
          email_address: 'test@test.org',
        },
      ])
    })
    .then(function() {
      return knex('users').then(function() {
        return knex('users').insert([
          {
            id: 1,
            username: 'om_test',
            email_address: 'om.test@test.com',
            password: '',
            first_name: 'om',
            last_name: 'test',
            display_name: 'om test',
            is_super_admin: true,
            organization_id: 1,
            // Hash for password value 'om_test'
            password_digest: '$2a$12$D4P79Z87Sfk6B/0XG57NreITw3LgRGEDW..hlTPLEkIJRtFObl/76',
          },
        ])
      })
    })
    .then(function() {
      return knex('audiences').then(function() {
        return knex('audiences').insert([
          {
            id: 1,
            name: 'om_audience',
            organization_id: 1,
          },
        ])
      })
    })
    .then(function() {
      return knex('conversations').then(function() {
        return knex('conversations').insert([
          {
            id: 1,
            name: 'om_conversation',
            status: false,
            organization_id: 1,
          },
        ])
      })
    })
    .then(function() {
      return knex('customers').then(function() {
        return knex('customers').insert([
          {
            id: 1,
            first_name: 'om1',
            last_name: 'test1',
            phone: '+16077688253',
          },
          {
            id: 2,
            first_name: 'om2',
            last_name: 'test2',
            phone: '+12012942121',
          },
        ])
      })
    })
    .then(function() {
      return knex('customer_infos').then(function() {
        return knex('customer_infos').insert([
          {
            id: 1,
            organization_id: 1,
            customer_id: 1,
          },
          {
            id: 2,
            organization_id: 1,
            customer_id: 2,
          },
        ])
      })
    })
    .then(function() {
      return knex('messages').then(function() {
        return knex('messages').insert([
          {
            id: 1,
            markup:
              '<meta http-equiv="Content-Type" content="text/html; charset=utf-8"> <message><style> @font-face { font-family: "Helvetica"; src: url("https://s3.amazonaws.com/om-fonts/Helvetica-Light.eot"); src: url("https://s3.amazonaws.com/om-fonts/Helvetica-Light.eot?#iefix") format("embedded-opentype"), url("https://s3.amazonaws.com/om-fonts/Helvetica-Light.woff") format("woff"), url("https://s3.amazonaws.com/om-fonts/Helvetica-Light.ttf") format("truetype"), url("https://s3.amazonaws.com/om-fonts/Helvetica-Light.svg#Helvetica-Light") format("svg"); font-weight: 300; font-style: normal; }@font-face { font-family: "Helvetica"; src: url("https://s3.amazonaws.com/om-fonts/Helvetica-Bold.eot"); src: url("https://s3.amazonaws.com/om-fonts/Helvetica-Bold.eot?#iefix") format("embedded-opentype"), url("https://s3.amazonaws.com/om-fonts/Helvetica-Bold.woff") format("woff"), url("https://s3.amazonaws.com/om-fonts/Helvetica-Bold.ttf") format("truetype"), url("https://s3.amazonaws.com/om-fonts/Helvetica-Bold.svg#Helvetica-Bold") format("svg"); font-weight: 600; font-style: normal; } </style><container style="background: #e5e7e6;max-width: 305px;display: block;padding-bottom: 2px;position: relative;margin-top: -8px;margin-left: -8px;"> <hero style="height: auto;width:100%;position: relative;display: block;background:#f6f6f6;z-index: 2;"> <div style="display: block; margin-left: 18px; margin-right:auto; width: 192px; padding-top: 18px; height: auto; vertical-align: top;z-index: 3;position:relative;"> <img style="max-width:100%;vertical-align: top;" src="https://s3.amazonaws.com/om-html-embedded-images/pedsny/pedsny_logo.png"> </div> <div style="display: block; margin-left: auto; margin-right:auto; width: 100%;height: auto; vertical-align: top;z-index: 2;margin-top:-14px;position:relative;"> <img style="max-width:100%;vertical-align: top;" src="https://s3.amazonaws.com/om-html-embedded-images/pedsny/pedsny_message1_hero.png"> </div> </hero> <text style="padding-left: 18px;display: block;padding-right: 18px;z-index:1;position:relative;padding-top:0px;"> <p style="margin-top: 0px;position: relative;padding-top: 7px;padding-bottom: 6px;margin-bottom: 0px;line-height: 1.3;color: #242424;font-size: 18px;font-family: "Helvetica",sans-serif;font-weight: 300;text-align: left;z-index: 1;letter-spacing: .005em;">To the Parent of:</p> <div data-list-type="horizontal" style="display:block;"> <div data-list-item-type="inline-block" style="display:inline-block;margin-right:6px;background:#0432cd;border-radius:20px;color:#FFFFFF;font-weight:600;padding-top:3px;padding-bottom:4px;line-height:1;padding-left:8px;padding-right:8px;font-family: "Helvetica",sans-serif;font-size:14px;letter-spacing: .025em;">Charles</div> <div data-list-item-type="inline-block" style="display:inline-block;margin-right:6px;background:#0432cd;border-radius:20px;color:#FFFFFF;font-weight:600;padding-top:3px;padding-bottom:4px;line-height:1;padding-left:8px;padding-right:8px;font-family: "Helvetica",sans-serif;font-size:14px;letter-spacing: .025em;">Maxwell J</div> </div> <p style="margin-top:5px;margin-bottom:7px;padding-top: 3px;font-family: "Helvetica",sans-serif;color:#242424;font-weight:300;font-size:18px;line-height:1.25;">The new <span style="font-weight:600;">flu vaccine</span> is in! Reply <span style="text-transform: uppercase;color:#0432cd;font-weight:600;border-bottom:2px solid #0432cd;display:inline-block;line-height:1.0;">flu</span> to have someone from our office contact you to set up an appointment. You can also schedule this visit through the patient portal.</p> </text> <footer> <p style="padding-left:18px;position:relative;margin-top:0;display:inline-block;color:#787878;z-index: 1;font-size:12px;font-family:"Helvetica",sans-serif;font-weight:300;letter-spacing: .00em;margin-bottom:14px;">Reply <span style="font-weight:600;">Mute</span> to opt out</p> <span style="float:right;display:inline-block;width:15px;height:15px;margin-right:15px;margin-top:-1px;"> <img style="max-width:100%;vertical-align: top;" src="https://s3.amazonaws.com/om-html-embedded-images/pedsny/pedsny_om_logo.png"> </span> </footer> </container> </message>',
            conversation_level: 0,
          },
        ])
      })
    })
    .then(function() {
      return knex('customers_audiences').then(function() {
        return knex('customers_audiences').insert([
          {
            id: 1,
            audience_id: 1,
            customer_id: 1,
          },
          {
            id: 2,
            audience_id: 1,
            customer_id: 2,
          },
        ])
      })
    })
    .then(function() {
      return knex('conversations_audiences').then(function() {
        return knex('conversations_audiences').insert([
          {
            id: 1,
            audience_id: 1,
            conversation_id: 1,
          },
        ])
      })
    })
    .then(function() {
      return knex('customers_messages').then(function() {
        return knex('customers_messages').insert([
          {
            id: 1,
            message_id: 1,
            customer_id: 1,
          },
          {
            id: 2,
            message_id: 1,
            customer_id: 2,
          },
        ])
      })
    })
    .then(function() {
      return knex('oauth_clients').then(function() {
        return knex('oauth_clients').insert([
          {
            id: 1,
            name: 'OM Test OAuth Client App',
            client_id: '33a22e49487f17fc68d33c5e5608dca1',
            client_secret: 'a336cde7a5efb5ea3bde51a710aeb7ab969447f2befd2ad4fabde0debf1ad119',
            redirect_uris: '*',
            grants: 'authorization_code,client_credentials,refresh_token,password',
            scope: '*',
            user_id: '1',
          },
        ])
      })
    })
}
