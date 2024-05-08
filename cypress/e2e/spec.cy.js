import 'cypress-xpath';

const email = 'thanhhn@antsomi.com';
const pwd = 'Thanhcong2204!@#';

let segmentId;
let segmentName;

let segmentMember;
let sqlMember;

const getSegmentUrl = 'https://sandbox-app.cdp.asia/hub/explorer/v2.0/search/-1003?portalId=33167&languageCode=en&_user_id=1600083946&_owner_id=1600083946';
const queySqlUrl = 'https://sandbox-api.cdp.asia/sqlwp/v1/run_sql';


let bodySegment = {
  "itemTypeId": -1003,
  "page": 1,
  "limit": 25,
  "search": "",
  "sort": "customer_id",
  "sd": "desc",
  "properties": [
    "name",
    "customer_id"
  ],
  "filters": {
    "OR": [
      {
        "AND": []
      }
    ]
  },
  "filterSegments": {
    "OR": [
      {
        "AND": [
          {
            "column": "segment_id",
            "value": ""
          }
        ]
      }
    ]
  },
  "decryptFields": []
};

let sqlBody = {
  "portal_id": 33167,
  "sql": "SELECT t.{{bos.customers.customer_id}} FROM [[bos.customers]] AS t WHERE t.{{bos.customers.customer_id}} LIKE '%123456789%' ORDER BY t.{{bos.customers.customer_id}} ASC",
  "limit": 25,
  "offset": 0,
  "spec_at_tables": {}
}

describe('test segment', () => {

  Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

  // before(() => {
  //   cy.login(email, pwd)

  // })

  it('create segment', () => {



    cy.visit('https://cdp.antsomi.com');

    cy.get('input[name=email]').type(email);
    cy.get('input[name=password').type(pwd);

    // Click Sign in
    cy.xpath('//*[@id="ants-tech-login-iam"]/div/form/div/div[3]/button').click();
    cy.wait(2000);

    // Click skip
    cy.xpath('//*[@id="ants-tech-login-iam"]/div/div[1]/div/div[5]').click();
    cy.wait(2000);

    // Select portal sandbox
    cy.xpath('//*[@id="ants-tech-login-iam"]/div/div[1]/div[3]/div/div[1]', { timeout: 2000 }).click();
    cy.wait(10000);


    // Click button menu
    cy.xpath('//*[@id="app"]/div/div/div/div[1]/ants-tech-side-navigation/div/button', { timeout: 10000 }).should('be.visible').click();

    // Click menu Personas and select Segments
    cy.xpath('//*[@id="app"]/div/div/div/div[1]/ants-tech-side-navigation/div/aside/div[1]/section[2]/div/div/span[1]')
      .contains('Personas')
      .click();
    cy.xpath('//*[@id="app"]/div/div/div/div[1]/ants-tech-side-navigation/div/aside/div[1]/section[2]/div/ul/li[3]/a/div/span')
      .contains('Segments')
      .click();
    cy.wait(15000);

    // Create segment  
    // Click on the div element with the specified class containing the child span element
    cy.get('div.styles__WrapperAddButton-bxmg41-0.jNHNfZ')
      .find('span.UIIconXlab__Span-txcxje-0.fKPjmB')
      .click();

    cy.get('[role="menuitem"][title="Customer Segment"]').click();
    cy.contains('div.styled__AccountItem-sc-3ima7y-9', 'Thanh QC').click();
    cy.contains('button', 'Select').click();

    cy.wait(5000)
    // get segment name
    // cy.get('input#standard-basic').first().invoke('val').then(value => {
    //   segmentName = value;
    // });
    // console.log(segmentName)
    // cy.wait(3000);

    cy.contains('button', 'Add condition').click();
    cy.get('li[role="menuitem"]').contains('Have attribute').click();
    cy.contains('span.styled__SpanSelectTree-sc-1lytd12-11', 'Select an item').eq(0).click();
    cy.xpath('//*[@id="-1003"]/span').click();
    cy.contains('div.styled__SpanLabel-sc-1lytd12-13', 'Customer ID').click();
    cy.contains('span.styled__SpanSelectTree-sc-1lytd12-11', 'matches any of').eq(0).click();
    cy.contains('div.styled__SpanLabel-sc-1lytd12-13', 'contains').click();
    cy.get('input[name=text-search]').type('123456789');
    cy.contains('button', 'Save').click();

    //get segment_id via api
    cy.intercept('POST', 'https://sandbox-app.cdp.asia/hub/item-segment/v2.0/segment/create?portalId=33167&languageCode=en&_user_id=1600083946&_owner_id=1600083946', (req) => {
      req.continue((res) => {
        //console.log(res.body)
      }
      )
    }).as('getSegmentId');


    cy.wait(5000);
    cy.wait('@getSegmentId').then(interception => {
      console.log('segment_id neeee', interception.response.body.data.entries[0])
      segmentId = interception.response.body.data.entries[0];
    });
    cy.wait(1000000);


    // //get segment id via UI

    // cy.then(() => {

    //   console.log('Segment Name ', segmentName);
    //   cy.get('.styles__WrapAddFilter-sc-1i7l92y-2 button').click();
    //   cy.get('div.group-header[role="menuitem"]').contains('div.group-label', 'Information fields').click();
    //   cy.contains('div.menu-item', 'Name').click();
    //   cy.contains('button', 'contains').click();
    //   cy.contains('span.Item__Label-sc-1ya7zfp-0.gPFNsY.private-nav-item__label.private-nav-item__label', 'equal to').click();
    //   cy.get('input[name=text-search]').type(segmentName);
    //   cy.contains('button', 'Apply').click();
    //   cy.wait(10000);
    //   cy.get('.td.txt-right.number.segment_id') // Select the parent element
    //     .find('.styles__StyleTextOverflow-uta7li-3.ggXjFK') // Find the child element containing the segment ID
    //     .invoke('text')
    //     .then((value) => {
    //       segmentId = value
    //     });
    //   cy.wait(3000)
    // })


    // cy.then(() => {
    //   console.log('Segment ID: ', segmentId);
    // })

    // cy.get('div.delete-button').click();    

    cy.getCookie('api_r_token').then(cookie => {
      const token = cookie ? cookie.value : null;
      bodySegment.filterSegments.OR[0].AND[0].value = segmentId.toString();
      cy.request({
        method: 'POST',
        url: getSegmentUrl,
        body: JSON.stringify(bodySegment),
        headers: {
          'Content-Type': 'application/json',
          'token': token
        }
      })
        .then((response) => {
          //console.log('response body neeeeeeeeeeeeeeeee', response.body);
          segmentMember = response.body.data;
        })
    })

    cy.request({
      method: 'POST',
      url: queySqlUrl,
      body: JSON.stringify(sqlBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        sqlMember = JSON.parse(response.body);
        //console.log('typeeeee ',typeof sqlMember);
      })

    cy.then(() => {
      console.log('segment member ', segmentMember);
      console.log('sql member ', sqlMember);
      // console.log('segment member meta total ', segmentMember.meta.total);
      // console.log('sql member total row ', sqlMember.total_row);
      expect(segmentMember.meta.total).to.equal(sqlMember.total_row);


      const memberFromSegment = segmentMember.entries.map(entry => entry.customer_id.value);
      const memberFromSql = sqlMember.data.map(entry => entry.customer_id);

      expect(memberFromSegment.sort()).to.deep.equal(memberFromSql.sort());
    })

  })


})
