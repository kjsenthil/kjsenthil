locals {
  front_door_name = "fd-gbl-${var.environment_prefix}-dh"
  front_ends = concat(
    [
      {
        name      = "default",
        host_name = "${local.front_door_name}.azurefd.net"
      }
    ],
    var.custom_domain != "" ? [{ name = "bestinvest", host_name = var.custom_domain }] : []
  )
}
