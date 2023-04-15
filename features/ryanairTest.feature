Feature: Verifying login window appearance.
  As user I want to check login window on the Ryanair web page.

  Scenario Outline: In order to verify test script
    Given I search for a flight from "<departurePoint>" to "<destinationPoint>" on "<date>" for 1 adult
    When I select the flight and fill the data with "<titleOfPassenger>", "<nameOfPassenger>" and "<surnameOfPassenger>"
    Then I choose the available seat
    Then I add 20 kg bag
    Then I skip the extras options
    Then login popup shows up


    Examples:
      | departurePoint | destinationPoint | date       | titleOfPassenger | nameOfPassenger | surnameOfPassenger |
      | KRK            | TGD              | 2023-05-19 | Mr               | Vasya           | Kragesh            |