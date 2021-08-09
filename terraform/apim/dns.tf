##############################################################
#              Private DNS Zones/Records                     #
##############################################################

resource "azurerm_private_dns_zone" "private_dns_zone" {
  count               = var.private_dns_zone == "" ? 0 : 1
  name                = var.private_dns_zone
  resource_group_name = data.azurerm_resource_group.resource_group.name
  tags                = merge(local.default_tags, var.tags)
}

resource "azurerm_private_dns_a_record" "dns_a_record" {
  for_each            = var.dns_a_records
  name                = each.value.name
  zone_name           = azurerm_private_dns_zone.private_dns_zone[0].name
  resource_group_name = data.azurerm_resource_group.resource_group.name
  ttl                 = 300
  records             = each.value.records
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

##############################################################
#               Public DNS Zones                             #
##############################################################

module "public_dns_zones" {
  source                 = "../modules/public_dns_zone"
  count                  = var.public_dns_zones != [] ? length(var.public_dns_zones) : 0
  public_dns_parent_zone = var.public_dns_zones[count.index].public_dns_parent_zone
  public_dns_child_zones = var.public_dns_zones[count.index].public_dns_child_zones
  resource_group_name    = data.azurerm_resource_group.resource_group.name
  tags                   = merge(local.default_tags, var.tags)
}
