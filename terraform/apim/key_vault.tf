module "key_vault" {
  source                           = "../modules/key_vault"
  resource_group_name              = var.resource_group_name
  location                         = var.location
  tags                             = merge(var.tags, local.default_tags)
  principal_id                     = module.apim.principal_id
  short_location                   = local.short_location
  environment_prefix               = var.environment_prefix
  slack_security_alert_webhook_url = var.slack_security_alert_webhook_url
  log_analytics_workspace_id       = azurerm_log_analytics_workspace.log_analytics.id
  virtual_network_id               = azurerm_virtual_network.this.id
  private_link_subnet_id           = azurerm_subnet.private_link_subnet.id
}