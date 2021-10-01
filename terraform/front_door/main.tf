module "front_door" {
  source             = "../modules/front_door"
  resource_group     = data.azurerm_resource_group.rg.name
  environment_prefix = var.environment_prefix
  backends = [
    {
      address = var.cdn_endpoint_host,
      enabled = true
    }
  ]
  health_check_interval        = 10
  health_check_sample_size     = 2
  health_check_success_samples = 1

  tags = merge(var.tags, local.default_tags)
}
