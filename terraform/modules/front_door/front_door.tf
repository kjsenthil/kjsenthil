resource "azurerm_frontdoor" "this" {
  enforce_backend_pools_certificate_name_check = true
  name                                         = local.front_door_name
  resource_group_name                          = var.resource_group

  backend_pool {
    name                = "backends"
    health_probe_name   = "HealthProbe"
    load_balancing_name = "LoadBalancer"

    dynamic "backend" {
      for_each = var.backends
      content {
        address     = backend.value.address
        host_header = backend.value.address
        http_port   = 80
        https_port  = 443
        enabled     = backend.value.enabled
      }
    }
  }

  backend_pool_health_probe {
    name                = "HealthProbe"
    protocol            = var.health_check_protocol
    interval_in_seconds = var.health_check_interval
    probe_method        = var.health_check_method
  }

  backend_pool_load_balancing {
    name                        = "LoadBalancer"
    sample_size                 = var.health_check_sample_size
    successful_samples_required = var.health_check_success_samples
  }

  dynamic "frontend_endpoint" {
    for_each = local.front_ends
    content {
      name      = frontend_endpoint.value.name
      host_name = frontend_endpoint.value.host_name
    }
  }

  routing_rule {
    name               = "default"
    accepted_protocols = ["Https"]
    patterns_to_match  = ["/*"]
    frontend_endpoints = [for frontend in local.front_ends : frontend.name]

    forwarding_configuration {
      backend_pool_name = "backends"
      cache_enabled     = var.cache_enabled
    }
  }

  tags = merge(map("tf_module_path", "./terraform/modules/front_door"), var.tags)
}
