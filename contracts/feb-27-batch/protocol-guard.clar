;; protocol-guard.clar
(define-data-var paused bool false)
(define-public (toggle-pause)
    (begin
        (var-set paused (not (var-get paused)))
        (ok true)))
