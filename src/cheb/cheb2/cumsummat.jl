function cheb2_cumsummat(::Type{TR}, n::TI) where {TR<:AbstractFloat,TI<:Integer}
    A = cheb2_amat(TR, n)
    S = cheb2_smat(TR, n)
    B = cheb_coeffs_cumsummat(TR, n)
    Q = S * B * A
    @inbounds Q[1, :] .= 0
    return Q
end

function cheb2_cumsummat(n::TI) where {TI<:Integer}
    return cheb2_cumsummat(Float64, n)
end

function cheb2_cumsummat(
    ::Type{TR}, n::TI, x_min::TR, x_max::TR
) where {TR<:AbstractFloat,TI<:Integer}
    Q = cheb2_cumsummat(TR, n)
    Q .*= (x_max - x_min) / 2
    return Q
end

function cheb2_cumsummat(n::TI, x_min::Float64, x_max::Float64) where {TI<:Integer}
    return cheb2_cumsummat(Float64, n, x_min, x_max)
end

export cheb2_cumsummat