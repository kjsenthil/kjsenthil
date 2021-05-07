resource "azurerm_resource_group" "dev_resource_group" {
  name     = format("%s-%s-rg", local.environment, local.rg_name)
  location = local.location
  tags     = local.default_tags
}

resource "azurerm_api_management" "apim" {
  name                = format("%s-%s-mgmt", local.environment, local.apim_name)
  resource_group_name = azurerm_resource_group.dev_resource_group.name
  location            = local.location
  publisher_name      = "digitalhybrid"
  publisher_email     = "digitalhybrid@credera.co.uk"
  sku_name            = "Developer_1"
  tags                = local.default_tags
  lifecycle {
    prevent_destroy = true
  }
}

resource "azurerm_application_insights" "app-insights" {
  name                = format("%s-%s", local.environment, local.apim_name)
  location            = local.location
  resource_group_name = azurerm_resource_group.dev_resource_group.name
  application_type    = "other"
  tags                = local.default_tags
}

resource "azurerm_api_management_logger" "apim_logger" {
  name                = format("%s-%s-apim-logger", local.environment, local.apim_name)
  api_management_name = azurerm_api_management.apim.name
  resource_group_name = azurerm_resource_group.dev_resource_group.name

  application_insights {
    instrumentation_key = azurerm_application_insights.app-insights.instrumentation_key
  }
}
