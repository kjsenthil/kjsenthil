resource "azurerm_api_management_api" "api" {
  name                  = var.name
  resource_group_name   = var.resource_group_name
  api_management_name   = var.api_management_name
  revision              = var.revision
  display_name          = var.name
  path                  = var.path
  protocols             = var.protocols
  subscription_required = var.subscription_required
  description           = var.description
}

resource "azurerm_api_management_logger" "apim_logger" {
  name                = var.api_management_logger_name
  api_management_name = var.api_management_name
  resource_group_name = var.resource_group_name
  resource_id         = var.app_insights_id

  application_insights {
    instrumentation_key = var.app_insights_instrumentation_key
  }
}

resource "azurerm_api_management_api_diagnostic" "api_diagnostic" {
  resource_group_name       = var.resource_group_name
  api_management_name       = var.api_management_name
  api_name                  = azurerm_api_management_api.api.name
  api_management_logger_id  = azurerm_api_management_logger.apim_logger.id
  identifier                = "applicationinsights"
  sampling_percentage       = 5.0
  always_log_errors         = true
  log_client_ip             = true
  verbosity                 = "verbose"
  http_correlation_protocol = "W3C"

  frontend_request {
    body_bytes = 32
    headers_to_log = [
      "content-type",
      "accept",
      "origin",
    ]
  }

  frontend_response {
    body_bytes = 32
    headers_to_log = [
      "content-type",
      "content-length",
      "origin",
    ]
  }

  backend_request {
    body_bytes = 32
    headers_to_log = [
      "content-type",
      "accept",
      "origin",
    ]
  }

  backend_response {
    body_bytes = 32
    headers_to_log = [
      "content-type",
      "content-length",
      "origin",
    ]
  }
}