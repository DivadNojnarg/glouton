
<!-- README.md is generated from README.Rmd. Please edit that file -->
glouton
=======

<!-- badges: start -->
<!-- badges: end -->
The goal of glouton is to handle browser cookies in shiny.

It's built on top of [js-cookie](https://github.com/js-cookie/js-cookie).

Installation
------------

You can install the released version of glouton from [github](https://github.com/ColinFay/glouton) with:

``` r
remotes::install_github("ColinFay/glouton")
```

Function reference
------------------

In the UI, add `use_glouton()` to integrate `{glouton}` to your app.

In the server, you can use:

-   `add_cookie` to add a session cookie. Takes a name, content, and the `session` object.
-   `fetch_cookies` / `fetch_cookie` to get all or one cookie. Takes the `session` and `input` objects and a name for `fetch_cookie()`
-   `remove_cookie` to remove one cookie. Takes a name of a cookie and the `session` object.

Example
-------

This is a basic example which shows you how to solve a common problem:

``` r
library(glouton)
library(shiny)
ui <- function(request){
  tagList(
    use_glouton(),
    textInput("cookie_name", "cookie name"),
    textInput("cookie_content", "cookie content"),
    actionButton("setcookie", "Add cookie"),
    actionButton("getcookie", "get cookie"),
    verbatimTextOutput("cook"),
    verbatimTextOutput("one")
  )
}

server <- function(input, output){

  r <- reactiveValues()

  observeEvent( input$setcookie , {
    add_cookie(input$cookie_name, input$cookie_content)
  })
  observeEvent( input$getcookie , {
    r$cook <- fetch_cookies()
  })

  output$cook <- renderPrint({
    r$cook
  })

}

shinyApp(ui, server)
```

TO DO
-----

-   Support passing domain / path / expire to cookie <https://github.com/js-cookie/js-cookie#basic-usage>
