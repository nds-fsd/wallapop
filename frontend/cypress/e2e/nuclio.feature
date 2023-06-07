Feature: NUCLIO cypress Nuclio testing

  Scenario: Fill input element
    Given I go to Nuclio
    When I type "proba@gmail.com" in the text input of the first example
    When I type "12345" in the text input of the second example
    Then I click in the first component of the sixth example
    # Then It contains the "Acceso inválido" text


  #   SI CONSEGUEIXO FER FUNCINAR CUCUMBER
  #   AQUEST TEST SERIA PER COMPROBAR ES LOGIN 