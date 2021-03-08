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
}