resource "azurerm_private_dns_zone" "private_dns_zone" {
  count               = var.private_dns_zone == "" ? 0 : 1
  name                = var.private_dns_zone
  resource_group_name = data.azurerm_resource_group.resource_group.name
  tags                = merge(local.default_tags, var.tags)
}

resource "azurerm_private_dns_a_record" "online" {
  count               = var.private_dns_zone == "" ? 0 : 1
  name                = "online"
  zone_name           = azurerm_private_dns_zone.private_dns_zone[0].name
  resource_group_name = data.azurerm_resource_group.resource_group.name
  ttl                 = 300
  records             = var.dns_a_records
  tags                = merge(local.default_tags, var.tags)
}

resource "azurerm_private_dns_zone_virtual_network_link" "link" {
  count                 = var.private_dns_zone == "" ? 0 : 1
  name                  = "link-${local.short_location}-apim-to-dns"
  resource_group_name   = data.azurerm_resource_group.resource_group.name
  private_dns_zone_name = azurerm_private_dns_zone.private_dns_zone[0].name
  virtual_network_id    = azurerm_virtual_network.this.id
  tags                  = merge(local.default_tags, var.tags)
}
