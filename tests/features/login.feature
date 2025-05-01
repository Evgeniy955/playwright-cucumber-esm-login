Feature: Login

  Scenario: Successful login
    Given I open the login page
    When I login with username "tc_eng@sharklasers.com" and password "test123"
    Then Choose "English" package
