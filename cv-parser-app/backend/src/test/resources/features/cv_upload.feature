Feature: CV Upload and Parsing
  Scenario: Upload a CV and see it parsed
    Given the backend is running
    When I upload a CV file
    Then the candidate should be parsed and saved 