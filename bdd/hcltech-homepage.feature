Feature: HCLTech homepage experience
  As a visitor to HCLTech
  I want to navigate the homepage easily and use its key functionality
  So that I can learn about services, explore content and take next actions

  Background:
    Given the user opens the HCLTech homepage
    Then the homepage should load successfully
    And the HCLTech branding should be visible
    And the primary navigation should be available

  @smoke @homepage
  Scenario: Homepage loads with critical sections visible
    Then the hero banner should be visible
    And the AI answer engine section should be visible
    And the Latest Highlights section should be visible
    And the services overview section should be visible
    And the footer should be visible

  @navigation @header
  Scenario: Visitor opens the main menu and views top-level navigation options
    When the user opens the main menu
    Then the menu should display the "What We Do" section
    And the menu should display the "Industries" section
    And the menu should display the "Who We Are" section
    And the menu should display the "Resources" section
    And the menu should display the "Careers" section

  @navigation @header
  Scenario Outline: Visitor navigates to a key area from the main menu
    When the user opens the main menu
    And the user selects "<menu_item>"
    Then the destination page should load successfully
    And the destination page should reflect "<menu_item>"

    Examples:
      | menu_item                     |
      | AI and Generative AI          |
      | Cloud                         |
      | Leadership                    |
      | Case Studies                  |
      | Explore job opportunities     |

  @contact
  Scenario: Visitor opens the Contact Us journey from the homepage
    When the user selects "Contact Us"
    Then the contact destination should load successfully
    And the user should be able to identify how to contact HCLTech

  @language
  Scenario Outline: Visitor switches homepage language
    When the user opens the language selector
    And the user selects the language "<language>"
    Then the localized experience for "<language>" should load without error

    Examples:
      | language |
      | English  |
      | Japanese |
      | German   |

  @search
  Scenario: Visitor opens and closes the search experience
    When the user opens the search experience
    Then the search input should be available
    When the user closes the search experience
    Then the homepage should remain stable

  @ai-widget
  Scenario: Visitor submits a question in the AI answer engine
    Given the AI answer engine is visible
    When the user enters a question into the AI answer engine
    And the user submits the AI question
    Then a loading state or response area should be displayed
    And the AI section should remain usable

  @ai-widget
  Scenario: Visitor clears the AI answer engine state
    Given the AI answer engine contains user input or generated content
    When the user selects "Clear"
    Then the AI answer engine should reset to its default state

  @hero @media
  Scenario: Visitor opens the hero media interview
    Given the hero banner is visible
    When the user selects "Watch the interview"
    Then the interview destination should open successfully

  @hero @carousel
  Scenario: Visitor pauses rotating hero content
    Given rotating hero content is active
    When the user selects "Pause"
    Then the hero rotation should stop or indicate a paused state

  @content @highlights
  Scenario Outline: Visitor opens a featured highlight from the homepage
    Given the Latest Highlights section is visible
    When the user opens the highlight titled "<highlight_title>"
    Then the corresponding content should load successfully

    Examples:
      | highlight_title                                                        |
      | Opportunity lies in scaling AI adoption to deliver measurable enterprise impact. |
      | HCLTech unveils AI Force 2.0                                           |
      | HCLTech named by Ethisphere as World’s Most Ethical Company® for the third year |

  @content @services
  Scenario Outline: Visitor opens a key service area from the homepage
    Given the services overview section is visible
    When the user selects the service CTA "<service_cta>"
    Then the service destination should load successfully

    Examples:
      | service_cta                     |
      | Explore our AI Services         |
      | Explore our Cloud Solutions     |
      | Explore our Engineering Services |

  @content @corporate
  Scenario: Visitor opens the company overview page from the homepage
    When the user selects "Learn more about HCLTech"
    Then the company overview destination should load successfully

  @content @reports
  Scenario: Visitor opens an analyst report link
    Given the recognition section is visible
    When the user selects "Download the analyst report"
    Then the analyst report destination should load successfully

  @testimonials @carousel
  Scenario: Visitor navigates through client testimonials
    Given the client testimonials section is visible
    When the user selects "Next"
    Then a different testimonial should be displayed
    When the user selects "Previous"
    Then the previous testimonial should be displayed

  @testimonials @media
  Scenario: Visitor opens a testimonial media link
    Given the client testimonials section is visible
    When the user selects a testimonial "Watch" link
    Then the testimonial media destination should load successfully

  @case-studies
  Scenario: Visitor explores case studies from the homepage
    Given the Case Studies section is visible
    When the user selects "See all case studies"
    Then the case studies destination should load successfully

  @case-studies
  Scenario: Visitor opens a featured case study card
    Given the Case Studies section is visible
    When the user opens a featured case study
    Then the case study destination should load successfully

  @careers
  Scenario: Visitor opens the careers journey from the homepage
    Given the careers section is visible
    When the user selects "Explore careers"
    Then the careers destination should load successfully

  @newsletter
  Scenario: Visitor starts the newsletter signup journey
    Given the newsletter section is visible
    When the user selects "Stay connected"
    Then the newsletter destination or form should load successfully

  @footer
  Scenario Outline: Visitor uses a footer legal or utility link
    Given the footer is visible
    When the user selects the footer link "<footer_link>"
    Then the footer destination should load successfully

    Examples:
      | footer_link        |
      | Disclaimer         |
      | Privacy Statement  |
      | Terms of use       |
      | Sitemap            |
      | Raise a Grievance  |

  @footer @social
  Scenario Outline: Visitor opens an HCLTech social link
    Given the footer is visible
    When the user selects the social link "<social_platform>"
    Then the social destination for "<social_platform>" should load successfully

    Examples:
      | social_platform |
      | Facebook        |
      | Twitter         |
      | LinkedIn        |
      | Instagram       |
      | Youtube         |
      | Threads         |

  @footer @privacy
  Scenario: Visitor opens the cookies policy from the footer area
    Given the cookie messaging is visible
    When the user selects "cookies policy"
    Then the cookies policy destination should load successfully

  @accessibility @keyboard
  Scenario: Keyboard user skips repeated navigation
    When the keyboard user tabs to "Skip to main content"
    And the keyboard user activates the skip link
    Then keyboard focus should move to the main content area

  @responsive
  Scenario Outline: Visitor uses the homepage on a supported viewport
    When the homepage is viewed on "<viewport>"
    Then the key homepage sections should remain visible and usable
    And navigation should remain accessible
    And primary CTAs should remain clickable

    Examples:
      | viewport |
      | desktop  |
      | tablet   |
      | mobile   |
