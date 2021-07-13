resource "azurerm_dns_zone" "public_dns_parent_zone" {
  count               = var.public_dns_parent_zone == "" ? 0 : 1
  name                = var.public_dns_parent_zone
  resource_group_name = var.resource_group_name
  tags                = merge(map("tf_module_path", "./terraform/modules/public_dns_zone"), var.tags)
}

resource "azurerm_dns_zone" "public_dns_child_zone" {
  for_each            = toset(var.public_dns_child_zones)
  name                = "${each.key}.${var.public_dns_parent_zone}"
  resource_group_name = var.resource_group_name
  tags                = merge(map("tf_module_path", "./terraform/modules/public_dns_zone"), var.tags)
}

resource "azurerm_dns_ns_record" "ns" {
  for_each            = toset(var.public_dns_child_zones)
  name                = each.key
  resource_group_name = var.resource_group_name
  zone_name           = var.public_dns_parent_zone
  ttl                 = 3600
  records             = azurerm_dns_zone.public_dns_child_zone[each.key].name_servers
}