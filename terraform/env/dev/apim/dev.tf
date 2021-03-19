resource "azurerm_resource_group" "dev_resource_group" {
  name     = format("%s-%s-rg", local.environment, local.rg_name)
  location = local.location
}

module "dev_apim" {
  source             = "../../../main"
  is_apim            = true
  is_apima           = false
  environment        = local.environment
  environment_prefix = "TESTING" # Not used within this module.
  rg_name            = azurerm_resource_group.dev_resource_group.name
  apim_name          = format("%s-%s-mgmt", local.environment, local.apim_name)
  path               = format("%s%s", local.environment, local.path)
}

resource "azurerm_application_insights" "app-insights" {
  name                = format("%s-%s", local.environment, local.apim_name)
  location            = local.location
  resource_group_name = azurerm_resource_group.dev_resource_group.name
  application_type    = "other"
}

resource "azurerm_api_management_logger" "apim_logger" {
  name                = format("%s-%s-apim-logger", local.environment, local.apim_name)
  api_management_name = format("%s-%s-mgmt", local.environment, local.apim_name)
  resource_group_name = azurerm_resource_group.dev_resource_group.name

  application_insights {
    instrumentation_key = azurerm_application_insights.app-insights.instrumentation_key
  }
  depends_on = [module.dev_apim]
}