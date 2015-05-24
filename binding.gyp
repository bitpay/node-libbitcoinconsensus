{
  "targets": [
    {
      "target_name": "bitcoinconsensus",
      "include_dirs" : [
        "<!(node -e \"require('nan')\")"
      ],
      "sources": [
        "bindings.cc"
      ],
      "libraries": [
        '/usr/local/lib/libbitcoinconsensus.so'
      ]
    }
  ]
}