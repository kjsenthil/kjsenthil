module "front_door" {
  source         = "../modules/front_door"
  resource_group = data.azurerm_resource_group.rg.name
  name           = local.front_door_name
  backends = [
    {
      address = var.cdn_endpoint_host,
      enabled = true
    }
  ]
  health_check_interval        = 10
  health_check_sample_size     = 2
  health_check_success_samples = 1
  custom_frontend = {
    name      = local.custom_frontend_name,
    host_name = azurerm_dns_cname_record.front_door.fqdn
  }

  tags       = merge(var.tags, local.default_tags)
  depends_on = [azurerm_dns_cname_record.front_door]
}

resource "azurerm_dns_cname_record" "front_door" {
  name                = "preview"
  resource_group_name = var.resource_group_name
  zone_name           = var.public_dns_zone_name
  ttl                 = 3600
  record              = "${local.front_door_name}.azurefd.net"
  tags                = merge(var.tags, local.default_tags)
}

// TODO: Replace hardcoded endpoint ID with module.front_door.frontend_endpoints[local.custom_frontend_name] once this
// bug is fixed: https://github.com/hashicorp/terraform-provider-azurerm/issues/10504
resource "azurerm_frontdoor_custom_https_configuration" "custom_https" {
  custom_https_provisioning_enabled = true
  frontend_endpoint_id              = "${module.front_door.id}/frontendEndpoints/${local.custom_frontend_name}"

  custom_https_configuration {
    certificate_source = "FrontDoor"
  }
}
