resource "azurerm_private_dns_zone" "keyvault_dns_private" {
  name                = "privatelink.vaultcore.azure.net"
  resource_group_name = var.resource_group_name
  tags                = merge(map("tf_module_path", "./terraform/modules/key_vault"), var.tags)
}

resource "azurerm_private_endpoint" "keyvault_private_endpoint" {
  name                = "pe-kv-${var.short_location}-${var.environment_prefix}-dh"
  resource_group_name = var.resource_group_name
  location            = var.location
  subnet_id           = var.private_link_subnet_id
  tags                = merge(map("tf_module_path", "./terraform/modules/key_vault"), var.tags)
  private_service_connection {
    name                           = "psc-kv-${var.short_location}-${var.environment_prefix}-dh"
    is_manual_connection           = false
    private_connection_resource_id = azurerm_key_vault.key_vault.id
    subresource_names              = ["vault"]
  }
  private_dns_zone_group {
    name                 = azurerm_private_dns_zone.keyvault_dns_private.name
    private_dns_zone_ids = [azurerm_private_dns_zone.keyvault_dns_private.id]
  }
}

data "azurerm_private_endpoint_connection" "keyvault_private_endpoint_connection" {
  name                = azurerm_private_endpoint.keyvault_private_endpoint.name
  resource_group_name = var.resource_group_name
}

resource "azurerm_private_dns_a_record" "keyvault_dns_a_record" {
  name                = lower(azurerm_key_vault.key_vault.name)
  zone_name           = azurerm_private_dns_zone.keyvault_dns_private.name
  resource_group_name = var.resource_group_name
  ttl                 = 300
  records             = [data.azurerm_private_endpoint_connection.keyvault_private_endpoint_connection.private_service_connection.0.private_ip_address]
  tags                = merge(map("tf_module_path", "./terraform/modules/key_vault"), var.tags)
}

resource "azurerm_private_dns_zone_virtual_network_link" "keyvault_dns_vnet_link" {
  name                  = "kv-vnet-link-${var.short_location}-${var.environment_prefix}-dh"
  resource_group_name   = var.resource_group_name
  private_dns_zone_name = azurerm_private_dns_zone.keyvault_dns_private.name
  virtual_network_id    = var.virtual_network_id
  tags                  = merge(map("tf_module_path", "./terraform/modules/key_vault"), var.tags)
}
